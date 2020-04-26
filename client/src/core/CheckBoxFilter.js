import React, { useState, useEffect } from "react";
import { Checkbox, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { getCategories } from "./helper/coreapicalls";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "white",
  },
}));

export default function CheckBoxFilter(props) {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  // const [error, setError] = useState(false);

  const loadAllCategories = () => {
    getCategories()
      .then((data) => {
        // if (data.error) {
        //   setError(data.error);
        // } else {
        setCategory(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);

        return err.json();
      });
  };

  useEffect(() => {
    loadAllCategories();
  }, []);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    // console.log("old", checked);
    // console.log("Current Index", currentIndex);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    // console.log("new", newChecked);
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () => {
    return category.map((value, index) => (
      <Grid key={index} item xs={12} sm={6}>
        {/* <DropdownItem> */}
        <Checkbox
          key={index}
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          className="bg-dark text-white text-left mx-1"
          checked={checked.indexOf(value._id) === -1 ? false : true}
        />
        <Paper color="secondary" className={classes.paper}>
          {value.name}
        </Paper>
        {/* </DropdownItem> */}
      </Grid>
    ));
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel className="bg-success">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon color="disabled" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Category</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="bg-dark">
          <Grid container spacing={3}>
            {renderCheckboxLists()}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
