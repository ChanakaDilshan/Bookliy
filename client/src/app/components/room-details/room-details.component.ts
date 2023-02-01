import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';



@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentRoom: Room = {
    title: '',
    description: '',
    tel: '',
    published: false
  };

  message = '';

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRoom(this.route.snapshot.params["id"]);
    }
  }

  getRoom(id: string): void {
    this.roomService.get(id)
      .subscribe({
        next: (data) => {
          this.currentRoom = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentRoom.title,
      description: this.currentRoom.description,
      published: status
    };

    this.message = '';

    this.roomService.update(this.currentRoom.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentRoom.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateRoom(): void {
    this.message = '';

    this.roomService.update(this.currentRoom.id, this.currentRoom)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This room was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteRoom(): void {
    this.roomService.delete(this.currentRoom.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/rooms']);
        },
        error: (e) => console.error(e)
      });
  }


}
