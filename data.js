const ROLE = {
  ADMIN: "admin",
  DOCTOR: "doctor",
  STUDENT: "student",
};

const users = [
  {
    id: "22234588889dd0012",
    name: "Kyle",
    role: "ROLE.ADMIN",
    password: "password",
  },
];

const courses = [
  {
    name: "math",
    id: "12345",
    idOfInstructor: "123456789",
  },
];

const loginUsers = [];

module.exports = {
  users: users,
  courses: courses,
  loginUsers: loginUsers,
};
