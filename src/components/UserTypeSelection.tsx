import React, { useState } from "react";
import styled from "styled-components";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent, // Import SelectChangeEvent type from @mui/material
} from "@mui/material";
import { UserType } from "../types/types" // Import UserType enum from types.ts
import "../components/UserTypeSelection.scss"

interface UserTypeSelectionProps {
  onSelectUserType: (type: UserType) => void;
}

const UserTypeSelectionWrapper = styled.div`
  h2 {
    /* Styles for h2 element */
  }
`;

const UserTypeFormControl = styled(FormControl)`
  min-width: 120px;
`;

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({
  onSelectUserType,
}) => {
  const [selectedType, setSelectedType] = useState<UserType>(UserType.Freelancer);

  const handleUserTypeChange = (event: SelectChangeEvent<UserType>) => {
    const selectedType = event.target.value as UserType; // Cast to UserType
    setSelectedType(selectedType);
    onSelectUserType(selectedType);
  };

  return (
    <UserTypeSelectionWrapper>
      <h2>Choose Your Role</h2>
      
      <UserTypeFormControl>
      <div className="container">
        <InputLabel id="user-type-label" >
          Join us as :
        </InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type-select"
          value={selectedType}
          onChange={handleUserTypeChange}
          className="selector"
        >
          <MenuItem value={UserType.Freelancer}>Freelancer</MenuItem>
          <MenuItem value={UserType.Recruiter}>Recruiter</MenuItem>
          </Select>
          </div>
      </UserTypeFormControl>
      
    </UserTypeSelectionWrapper>
  );
};

export default UserTypeSelection;