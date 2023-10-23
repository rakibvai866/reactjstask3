import { useState } from "react";
import "./App.css";

function App() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  const presentList = students.filter((student) => student.isPresent === true);
  const absentList = students.filter((student) => student.isPresent === false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    editMode ? updateHandler(e) : createHandler();
  };

  const createHandler = () => {
    const newStudent = {
      id: Date.now() + "",
      name: studentName,
      isPresent: undefined,
    };

    setStudents([...students, newStudent]);
    setStudentName("");
  };

  const editHandler = (student) => {
    console.log(student.name);
    setEditMode(true);
    setStudentName(student.name);
    setEditableStudent(student);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const updatedStudentList = students.map((student) => {
      if (student.id === editableStudent.id) {
        return { ...student, name: studentName };
      }
      return student;
    });

    setStudents(updatedStudentList);
    setStudentName("");
    setEditMode(false);
  };

  const removeHandler = (studentId) => {
    const deleteStudent = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(deleteStudent);
    console.log(deleteStudent);
  };

  const makePresentHandler = (student) => {
    if (student.isPresent !== false) {
      const newStudentList = students.map((item) => {
        if (item.id === student.id) {
          return { ...item, isPresent: true };
        }
        return item;
      });
      setStudents(newStudentList);
    } else {
      alert("Student is already absent");
    }
  };

  const makeAbsentHandler = (student) => {
    if (student.isPresent !== true) {
      const newStudentList = students.map((item) => {
        if (item.id === student.id) {
          return { ...item, isPresent: false };
        }
        return item;
      });
      setStudents(newStudentList);
    } else {
      alert("Student is already present");
    }
  };

  const toggleHandler = (student) => {
    const newStudentList = students.map((item) => {
      if (item.id === student.id) {
        return { ...item, isPresent: !item.isPresent };
      }
      return item;
    });
    setStudents(newStudentList);
  };

  return (
    <div className="App">
      <form className="student-form" onSubmit={submitHandler}>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        ></input>
        <button type="submit">{editMode ? "Update" : "Add"}</button>
      </form>

      <div className="student-section">
        <div className="all-students">
          <h2>All Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                <span>{student.name}</span>
                <button onClick={() => editHandler(student)}>Edit</button>
                <button onClick={() => removeHandler(student.id)}>
                  Remove
                </button>
                <button onClick={() => makePresentHandler(student)}>
                  Make Present
                </button>
                <button onClick={() => makeAbsentHandler(student)}>
                  Make Absent
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="present-list">
          <h2>Present List</h2>
          <ul>
            {presentList.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <button onClick={() => toggleHandler(item)}>
                  Accidentally Added
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="absent-list">
          <h2>Absent List</h2>
          <ul>
            {absentList.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <button onClick={() => toggleHandler(item)}>
                  Accidentally Added
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
