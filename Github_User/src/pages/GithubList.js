import _ from 'lodash';
import React, {Component} from 'react';
import { ListView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { githubFetch } from '../actions';
import ListItem from './ListItem';
/* import GithubDetail from './GithubDetail'; */

class GithubList extends Component {

    componentWillMount(){
        this.props.githubFetch();
        this.createDataSource(this.props);

        this.props.navigation.setParams({
            'onRight': this.handleIconTouch                
        });
    }

    handleIconTouch() {
        console.log("Click!!!!");
        //console.log(navigation);
        /* this.props.navigation.title */
        /* return (
            <TextInput 
                placeholder="search..."
            />
        ); */
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps);
    }

    createDataSource({ github }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(github);
    }

    renderRow(github){
        return <ListItem github={github} />;
    }

    render(){
        /* console.log("render: "+this.props); */
        return(
           <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
           />
        );
    }
}

const mapStateToProps = state => {
    const github = _.map(state.github, (val, id) => {
        return { ...val, id };
    });

    return { github };
};

export default connect(mapStateToProps,{ githubFetch })(GithubList);