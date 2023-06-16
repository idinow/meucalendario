import React, {Component} from "react";
import MyCalendar from "./myCalendar";
import withDragAndDrop from "../../../node_modules/react-big-calendar/lib/addons/dragAndDrop"

const DragAndDropCalendar = withDragAndDrop(MyCalendar);

class Dnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
}
export default DragAndDropCalendar;
