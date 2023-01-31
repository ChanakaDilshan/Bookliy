import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  room: Room = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
  }

  saveRoom(): void {
    const data = {
      title: this.room.title,
      description: this.room.description
    };

    this.roomService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newRoom(): void {
    this.submitted = false;
    this.room = {
      title: '',
      description: '',
      published: false
    };
  }

}
