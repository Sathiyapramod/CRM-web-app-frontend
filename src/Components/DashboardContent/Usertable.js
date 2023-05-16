import React, { useState, useEffect } from "react";
import { API } from "../../General/General";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Usertable() {
  const [users, setUsers] = useState([]);
  const getUsersfromDB = () => {
    fetch(`${API}/user/headcount`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        usertype: localStorage.getItem("usertype"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        // console.log(result);
      });
  };

  useEffect(() => {
    getUsersfromDB();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <div className="card">
        <div className="card-header fw-bold fs-3">Users Profile </div>
        <div className="card-body">
          <PieChart width={400} height={400}>
            <Pie
              data={users}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              outerRadius={120}
              dataKey="count"
              nameKey="_id"
            >
              {users.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={COLORS[index]} />;
              })}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Usertable;
