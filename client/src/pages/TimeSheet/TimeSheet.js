import React, { useEffect, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Loader from '../../components/Loader/Loader';

import { getMyTimeCard } from '../../redux/timeCard/timeCardAction';

const TimeSheet = ({ getMyTimeCard, entries, fetching }) => {

    useEffect(() => {
        getMyTimeCard();
        
    }, [getMyTimeCard]);

    return (
        <div>
            <Header />
            <Sidebar />
            <div class="timesheet-body">
                {!fetching?
                <div class="">
                    <thead>
                        <tr class="">
                            <th class="table-data">Date</th>
                            <th class="table-data">Clock In</th>
                            <th class="table-data">Clock Out</th>
                        </tr>
                    </thead>
                    <tbody>

                        {entries && entries.map((entry) => (
                            <tr class="row-spacing">
                                <td class="table-data">{entry.day}</td>
                                <td class="table-data">{moment(entry.punchIn).format('h:mm:ss a')}</td>
                                <td class="table-data">{entry.punchOut ? moment(entry.punchOut).format('h:mm:ss a') : ' '}</td>
                            </tr>
                        ))}

                    </tbody>
                </div>
                :<div class="w-layout-grid grid-4"><Loader /> </div>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    entries: state.timeCard.entries,
    fetching: state.timeCard.fetching
});

const mapDispatchToProps = (dispatch) => ({
    getMyTimeCard: () => dispatch(getMyTimeCard())
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);
