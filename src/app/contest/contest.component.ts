import { Component ,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
export interface Contest {
  name: string;
  entryFee: number;
  prizePool: number;
  maxParticipants:number;
  participants:number[];
  participantCount: number; 
  // Other properties
}

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit{
  contests: Contest[] = [];


  constructor(private http: HttpClient, private router:Router) {
    // Fetch contest details from the service and set participants, contestOpen, and contestFull properties.
  }
  ngOnInit(): void {
    this.http.get<Contest[]>('http://localhost:3000/api/contests').subscribe((contests) => {

    contests.forEach((contest) => {
      contest.participantCount = contest.participants.length;
    });
      this.contests = contests;
    });
  }
  join(){
    this.router.navigate(['/creativity']);
  }

}
