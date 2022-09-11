import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {schema, rules} from '@ioc:Adonis/Core/Validator';

export default class AuthController {

    public async register({request, response, auth}: HttpContextContract){
        const userSchema = schema.create({
            username: schema.string({trim: true}),
            email: schema.string({trim: true}, [rules.email(), rules.unique({table: 'users', column: 'email', caseInsensitive: true})]),
            password: schema.string({}, [])
        })
        const data = await request.validate({schema: userSchema})

        const user = await User.create(data)

        await auth.login(user)
        return response.redirect('/')
    }

    public async registerIndex({view}: HttpContextContract) {
        return view.render('auth/register')
    }
    
    public async loginIndex({view}: HttpContextContract) {
        return view.render('auth/login')
    }

    public async login({request, response, auth, session}: HttpContextContract){
        const { uid, password } = request.only(['uid', 'password'])

        try{
            await auth.attempt(uid, password)
        } catch(error){
            session.flash('form', 'Mail ou mot de passe incorrect')
            return response.redirect().back()
        }

        return response.redirect('/')
    }
    
    public async logout({response, auth}:HttpContextContract ){
        await auth.logout()

        return response.redirect().toRoute('movies.index')
    }


}

