import { Component, OnInit } from '@angular/core';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';

@Component({
  selector: 'app-student-sheet',
  templateUrl: 'student-sheet.page.html',
  styleUrls: ['student-sheet.page.scss']
})
export class teacherStudentSheetPage implements OnInit {
  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  courseusers: any;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
  }

  ngOnInit(): void {
    this.teacherservices.getCourseSemesterStudentsSheet(this.currentCourse.courseCode, this.currentCourseSemester.semesters[0].semester_time).subscribe(res => {
      this.courseusers = res;
    }, err => {
      this.courseusers = err
    }
    );

  }

}
