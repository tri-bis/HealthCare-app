import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';
import { Departments } from './components/departments/departments';
import { DoctorsList } from './components/doctors-list/doctors-list';
import { Beds } from './components/beds/beds';
import { bloodbank } from './components/blood-bank/blood-bank';
import { DoctorHome } from './components/doctor-home/doctor-home';
import { DoctorDashboard } from './components/doctor-dashboard/doctor-dashboard';
import { Schedules } from './components/schedules/schedules';
import { Admin } from './components/admin/admin';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'dashboard', component: Dashboard },
    { path: 'departments', component: Departments },
    { path: 'beds', component: Beds },
    { path: 'blood-bank', component: bloodbank },
    { path: 'doctors/:departmentName', component: DoctorsList },
    { path: 'admin', component: Admin },
    { path: 'doctor-home', component: DoctorHome, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DoctorDashboard },
        { path: 'schedules', component: Schedules }
    ] }




];
