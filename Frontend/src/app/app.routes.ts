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
    children: [
      {
        path: '',
        component: ClientPage
      },
      {
        path: 'events',
        component: ClientEventsPage
      },
      {
        path: 'reservations',
        component: ClientReservationsPage
      },
      {
        path: 'create-reservation/:eventoId',
        component: ClientCreateReservationPage
      }
    ]
  },

  {
    path: 'agent',
    children: [
      {
        path: '',
        component: AgentPage
      },
      {
        path: 'events',
        component: AgentEventsPage
      },
      {
        path: 'reservations',
        component: AgentReservationsPage
      },
      {
        path: 'create-event',
        component: AgentCreateEventPage
      }
    ]
  },

  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminPage
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];