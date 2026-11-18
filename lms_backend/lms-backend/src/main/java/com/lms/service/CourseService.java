package com.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lms.entity.Course;
import com.lms.repository.CourseRepository;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // Add Course
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get All Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get Course By ID
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    // Update Course
    public Course updateCourse(Long id, Course updatedCourse) {

        Course existingCourse =
                courseRepository.findById(id).orElse(null);

        if (existingCourse == null) {
            return null;
        }

        existingCourse.setTitle(updatedCourse.getTitle());
        existingCourse.setDescription(updatedCourse.getDescription());
        existingCourse.setDuration(updatedCourse.getDuration());

        return courseRepository.save(existingCourse);
    }

    // Delete Course
    public boolean deleteCourse(Long id) {

        if (!courseRepository.existsById(id)) {
            return false;
        }

        courseRepository.deleteById(id);
        return true;
    }
}