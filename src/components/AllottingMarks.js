import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import "./AllottingMarks.css";

const AllottingMarks = ({ grade, subject }) => {
  return (
    <div className="allotting-marks-container">
      <TeacherSidebar />
      <div className="main-content">
        <h2>
          Grade: {grade}, Subject: {subject}
        </h2>
        <table>
          <thead>
            <tr>
              <th>Registration No.</th>
              <th>FA 1</th>
              <th>FA 2</th>
              <th>Final</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{/* Table rows will be populated later */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AllottingMarks;
