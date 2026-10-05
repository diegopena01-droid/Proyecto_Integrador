import { Routes } from '@angular/router';

import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

import { ClientPage } from './pages/client/client.page';
import { ClientEventsPage } from './pages/client-events/client-events.page';
import { ClientReservationsPage } from './pages/client-reservations/client-reservations.page';
import { ClientCreateReservationPage } from './pages/client-create-reservation/client-create-reservation.page';

import { AgentPage } from './pages/agent/agent.page';
import { AgentEventsPage } from './pages/agent-events/agent-events.page';
import { AgentReservationsPage } from './pages/agent-reservations/agent-reservations.page';
import { AgentCreateEventPage } from './pages/agent-create-event/agent-create-event.page';

import { AdminPage } from './pages/admin/admin.page';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginPage
  },

  {
    path: 'register',
    component: RegisterPage
  },

  {
    path: 'client',
    component: ClientPage
  },

  {
    path: 'client/events',
    component: ClientEventsPage
  },

  {
    path: 'client/reservations',
    component: ClientReservationsPage
  },

  {
    path: 'client/create-reservation',
    component: ClientCreateReservationPage
  },

  {
    path: 'agent',
    component: AgentPage
  },

  {
    path: 'agent/events',
    component: AgentEventsPage
  },

  {
    path: 'agent/reservations',
    component: AgentReservationsPage
  },

  {
    path: 'agent/create-event',
    component: AgentCreateEventPage
  },

  {
    path: 'admin',
    component: AdminPage
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];