import React, { useState } from "react";
import styled from "styled-components";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent, // Import SelectChangeEvent type from @mui/material
} from "@mui/material";
import { UserType } from "../../types/types"; // Import UserType enum from types.ts
import "../register/UserTypeSelection.scss";

interface UserTypeSelectionProps {
  onSelectUserType: (type: UserType) => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({
  onSelectUserType,
}) => {
  const [selectedType, setSelectedType] = useState<UserType>(
    UserType.Freelancer
  );

  const handleUserTypeChange = (event: SelectChangeEvent<UserType>) => {
    const selectedType = event.target.value as UserType; // Cast to UserType
    setSelectedType(selectedType);
    onSelectUserType(selectedType);
  };

  return (
    <div>
      <h2>Choose Your Role</h2>
      <div className="reg-container">
        <div>
          <InputLabel id="user-type-label">Join us as :</InputLabel>
        </div>
        <div>
          <Select
            labelId="user-type-label"
            id="user-type-select"
            value={selectedType}
            onChange={handleUserTypeChange}
            className="selector"
            displayEmpty
          >
            <MenuItem value={UserType.Freelancer}>Freelancer</MenuItem>
            <MenuItem value={UserType.Recruiter}>Manager</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
