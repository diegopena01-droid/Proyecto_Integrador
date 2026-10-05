import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-agent',
  imports: [RouterLink],
  templateUrl: './agent.page.html',
  styleUrl: './agent.page.scss',
})
export class AgentPage {
stats = {
  totalEvents: 4,
  activeEvents: 2,
  totalReservations: 27,
  pendingReservations: 5,
};

}

