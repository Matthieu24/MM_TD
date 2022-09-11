/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
launch: node ace serve --watch
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'


Route.get('/', 'MoviesController.index').as('index')

Route.group(() => {

  Route.get('/', 'MoviesController.index').as('index')
  Route.get('/:id/show', 'MoviesController.show').as('show')
  Route.get('/add', 'MoviesController.create').as('add')
  Route.post('/save', 'MoviesController.save').as('save')
  Route.post('/:id/save', 'MoviesController.save').as('save.update')
  Route.get('/:id/edit', 'MoviesController.update').as('edit')
  Route.get('/:id/delete', 'MoviesController.delete').as('delete')

}).prefix('/movies').as('movies')

Route.group(() => {

  Route.get('/', 'TypesController.index').as('index')
  Route.get('/:id/show', 'TypesController.show').as('show')
  Route.get('/add', 'TypesController.create').as('add')
  Route.post('/save', 'TypesController.save').as('save')
  Route.post('/:id/save', 'TypesController.save').as('save.update')
  Route.get('/:id/edit', 'TypesController.update').as('edit')
  Route.get('/:id/delete', 'TypesController.delete').as('delete')

}).prefix('/types').as('types')

Route.group(() => {

  Route.get('/', 'UsersController.index').as('index')
  Route.get('/:id/show', 'UsersController.show').as('show')
  Route.get('/add', 'UsersController.create').as('add')
  Route.post('/save', 'UsersController.save').as('save')
  Route.post('/:id/save', 'UsersController.save').as('save.update')
  Route.get('/:id/edit', 'UsersController.update').as('edit')
  Route.get('/:id/delete', 'UsersController.delete').as('delete')

}).prefix('/users').as('users')

// Route.get('/health', async ({ view }) => {
//   return view.render('health')
// })

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.group(() => {

  Route.get('/register', 'AuthController.registerIndex').as('register.index')
  Route.post('/register', 'AuthController.register').as('register')
  Route.get('/login', 'AuthController.loginIndex').as('login.index')
  Route.post('/login', 'AuthController.login').as('login')
  Route.get('/logout', 'AuthController.logout').as('logout')

}).as('auth')
