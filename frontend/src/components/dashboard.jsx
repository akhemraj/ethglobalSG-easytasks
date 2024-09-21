import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('need-help');

  return (
   <div>user verified</div>
  );
};

export default Dashboard;