import React from 'react';
import axios from 'axios';
import {getAllLogs} from './helper/auth.js'
import {NotesEntry} from './NotesEntry.jsx';
import {Link} from 'react-router';

class MeetingNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: []
    };
  }

  componentWillMount() {
    getAllLogs()
    .then((resp) => {
      if (this.props.student_id === '') {
        this.setState({
          logs: resp.data.filter((log) => {return log.types === 2}),
        });
      } else {
        this.setState({
          logs: resp.data.filter((log) => {return log.types === 2 && log.student_id === this.props.student_id}),
          studentName: resp.data.filter((log) => {return log.student_id === this.props.student_id})[0].first_name + ' ' + resp.data.filter((log) => {return log.student_id === this.props.student_id})[0].last_name,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render () {
    return (
      <div id="wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
                <h1 className="alignleft">{this.state.studentName} Meeting Notes</h1>
                <h3 className="alignright"><Link to="/createnote"><img src="add.png" height="25px" />Meeting Notes</Link></h3>
                  <table className="table table-hover" >
                    <thead>
                      <tr>
                        <th className="col-md-2">Date of Meeting</th>
                        <th className="col-md-2">Student</th>
                        <th className="col-md-3">IEP Members Present</th>
                        <th className="col-md-5">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.logs.map((log, index) => {
                          return (
                            <NotesEntry eachLog={log} key={index} />
                          )
                        })
                      }
                    </tbody>
                  </table>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {MeetingNotes};