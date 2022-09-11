import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Type from 'App/Models/Type'

export default class TypesController {

    public async index({view}){
        const types = await Type.all();
        
        return view.render('types/index', {
            types: types
        })
    
    }
    
    public async create({ auth, response, view}){
        if(auth.user)
            return view.render('types/create');
        else
            return response.redirect('/')
    }

    public async save({ auth, request, response, params}){

        if(auth.user){

            if(params.id){
                const type = await Type.find(params.id)

                if(type){
                    type.label = request.body().label;
                    type.save()
                }   
            }
            else{
                    
                const type = new Type();
        
                type.label = request.body().label;
        
                await type.save();
            
            }

            return response.redirect('/types')
        }

        return response.redirect('/')
    }
    
    public async show({ response, params }: HttpContextContract) {
        const type = await Type.find(params.id)
          
        return response.json({type})
    }
    
    public async update({ auth, response, view, params }: HttpContextContract) {
        
        if(auth.user){
            const type = await Type.find(params.id)

            return view.render('types/update', {
                type: type
            });
        }
        else response.redirect('/')
    }
    
    public async delete({ auth, response, params }: HttpContextContract) {
        if(auth.user)
        {
            const type = await Type.find(params.id)
            if (type){

                await type.delete()

                if(type.$isDeleted)
                    // response.json('Le type à été supprimer');
                    return response.redirect('/types')
                else
                    return response.json('Une erreur c\'est produite');
            }
            // return response.redirect('/types')
        }
        else
            return response.redirect('/')
        
    }
}
