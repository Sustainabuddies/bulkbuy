/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as GroceryList} from './grocery-list'
export {Login, Signup} from './auth-form'

export {default as SelectStore} from './select-store'
