import ReactOnRails from 'react-on-rails';
import HelloWorldApp from './HelloWorldAppClient';
import PostViewClient from './PostViewClient';
import CreateEventView from '../containers/CreateEventView';
import GroupJoinView from '../containers/GroupJoinView';
import UserAvatarView from '../components/UserAvatarView';
import TrackFinder from '../containers/TrackFinder';


// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({ HelloWorldApp });
ReactOnRails.register({ PostViewClient });
ReactOnRails.register({ CreateEventView });
ReactOnRails.register({ GroupJoinView });
ReactOnRails.register({ UserAvatarView });
ReactOnRails.register({ TrackFinder });
