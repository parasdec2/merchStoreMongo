import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "white",
  },
  slider: {
    marginTop: 3,
    color: "#00a152",
  },
}));

function valuetext(value) {
  return `$ ${value}`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 200]);

  const handleChange = (event, newValue) => {
    console.log("NEW VALUE ", newValue);

    setValue(newValue);
    props.handleFilters(newValue);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel className="bg-success">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon color="disabled" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Price</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="bg-dark">
          <Slider
            className={classes.slider}
            value={value}
            onChange={handleChange}
            step={10}
            max={200}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
