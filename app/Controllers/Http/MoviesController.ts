import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from 'App/Models/Movie'
// import Type from 'App/Models/Type'
import Application from '@ioc:Adonis/Core/Application'

export default class MoviesController {

    public async index({view, auth}){
        console.log(auth.user)
        const movies = await Movie.all();
        
        return view.render('movies/index', {
            movies: movies
        })
    
    }
    
    public async create({auth, view, response}){
        if(auth.user)
            return view.render('movies/create');
        else
            return response.redirect('/')
    }

    public async save({auth,request, response, params}){
        if(auth.user){
            const coverImage = request.file('cover')
            console.log(request.body().cover)
            let fileName = ""

            if (coverImage) {
                await coverImage.move(Application.publicPath('cover'), {
                    overwrite: true,
                })    
                fileName = coverImage.fileName;
            }
        

            if(params.id){
                const movie = await Movie.find(params.id)
                if(movie){
                    movie.title = request.body().title;
                    movie.description = request.body().description;
                    movie.duration = request.body().duration;
                    movie.studio = request.body().studio;
                    movie.date = request.body().date;
                    movie.cover = fileName;
                    movie.save()
                    
                }   
            }
            else{
                    
                const movie = new Movie();
        
                movie.title = request.body().title;
                movie.description = request.body().description;
                movie.duration = request.body().duration;
                movie.studio = request.body().studio;
                movie.date = request.body().date;
                movie.cover = fileName;
        
                await movie.save();

            }
            return response.redirect('/movies')
        }
        else
        response.redirect('/')
    
    }
    
    public async show({ response, params }: HttpContextContract) {
        const movie = await Movie.find(params.id)
          
        return response.json({movie})
    }
    
    public async update({auth, response, view, params }: HttpContextContract) {
        if(auth.user){
            const movie = await Movie.find(params.id)

            return view.render('movies/update', {
                movie: movie
            });
        }
        else
            return response.redirect('/')
        
    }
    
    public async delete({ auth, response, params }: HttpContextContract) {
        if(auth.user){
            const movie = await Movie.find(params.id)
            if (movie){

                await movie.delete()

                if(movie.$isDeleted)
                    // return response.json('Le movie à été supprimer');
                    return response.redirect('/movies')
                else
                    return response.json('Une erreur c\'est produite');
            }
            return response.redirect('/movies')
        }
        else
            return response.redirect('/')
        
    }

}
