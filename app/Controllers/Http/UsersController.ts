import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import {schema, rules} from '@ioc:Adonis/Core/Validator'

export default class UsersController {



    public async index(){
        return true;
    }
    
    public async create({request, response, auth, view}: HttpContextContract){

        if(auth.user)
            return view.render('user/create');
        else
            return response.redirect('/')

        

        return response.redirect('/users')  

    }

    public async save({auth,request, response, params}){
        if(auth.user){

            if(params.id){

                const userSchema = schema.create({
                    username: schema.string({trim: true}),
                    email: schema.string({trim: true}, [rules.email(), rules.unique({table: 'users', column: 'email', caseInsensitive: true})]),
                    password: schema.string({}, [])
                })
                const data = await request.validate({schema: userSchema})

                const user = await User.find(params.id)
                
                if(user){
                    // user.title = request.body().title;
                    // user.description = request.body().description;
                    // user.duration = request.body().duration;
                    // user.studio = request.body().studio;
                    // user.date = request.body().date;
                    // user.cover = fileName;
                    user.save()
                    
                }   
            }
            else{
                    
                const user = new User();
        
                // user.title = request.body().title;
                // user.description = request.body().description;
                // user.duration = request.body().duration;
                // user.studio = request.body().studio;
                // user.date = request.body().date;
                // user.cover = fileName;
        
                await user.save();

            }
            return response.redirect('/movies')
        }
        else
        response.redirect('/')
    
    }
    
    public async show({ response, params }: HttpContextContract) {
        let users = Database
        .from('users')
        .select('id', 'firstName','lastName', 'email')
        .where('id', params.id)

        return users;
        // return response.json({id: params.id})
    }
    
    public async update({ response, params, view, auth }: HttpContextContract) {
        if(auth.user){
            const user = await User.find(params.id)

            return view.render('movies/update', {
                user: user
            });
        }
        else
            return response.redirect('/')
    }
    
    public async delete({ response, params, auth }: HttpContextContract) {
        if(auth.user){
            const user = await User.find(params.id)
            if (user){

                await user.delete()

                if(user.$isDeleted)
                    // return response.json('Le user à été supprimer');
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
