import { Router } from 'express';
import { getAllCourses , getLecturesByCourseId } from '../controller/course.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { createCourse } from '../controller/course.controller.js'
import { updateCourse } from '../controller/course.controller.js';
import{ removeCourse } from '../controller/course.controller.js';
import { authorizedRoles } from '../middlewares/auth.middleware.js';
import { addLectureToCourseById } from '../controller/course.controller.js';
const router = Router()

router.route('/')
.get( getAllCourses)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    // upload.single('thumbnail'),
    createCourse
    );

router.route('/:id') 
    .get(isLoggedIn , getLecturesByCourseId,authorizedSubscriber)
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        updateCourse)
    .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        removeCourse)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        // upload.single('lecture'),
        addLectureToCourseById
    );

export default router;