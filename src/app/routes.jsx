import { DashboardIcon, Order, Products ,UnreadMessage,Users } from "./assests/Icons";

export const  Routes = [
{
 path:'/dashboard',
 page : 'Dashboard',
 Icon :<DashboardIcon/>
},
{
 path:'/orders',
 page : 'Orders',
 Icon : <Order/>
},
{
 path:'/products',
 page : 'Products',
 Icon : <Products/>
},
{
 path:'/users',
 page : 'Users',
 Icon : <Users/>
},
{
 path:'/users',
 page : 'Messages',
 Icon : <UnreadMessage/>
}]



