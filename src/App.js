import React, { Component } from 'react';
import GuestList from './GuestList';
import Counter from './Counter';

class App extends Component {
	
	state = {
		isFiltered: false,
		pendingGuest: "",
		guests: [{
			name: 'Name 1',
			isConfirmed: false,
			isEditing: false
		}, {
			name: 'Name 2',
			isConfirmed: true,
			isEditing: false
		}, {
			name: 'Name 3',
			isConfirmed: true,
			isEditing: true
		}]
	}

	toggleGuestPropertyAt = (property, indexToChange) =>
		this.setState({
			guests: this.state.guests.map((guest, index) => {
				if (index === indexToChange) {
					return {
						...guest,
						[property]: !guest[property]
					};
				}
				return guest;
			})
		});

	toggleConfirmationAt = (index) =>
		this.toggleGuestPropertyAt("isConfirmed", index)	

	toggleEditingAt = (index) =>
		this.toggleGuestPropertyAt("isEditing", index)

	setNameAt = (name, indexToChange) =>
		this.setState({
			guests: this.state.guests.map((guest, index) => {
				if (index === indexToChange) {
					return {
						...guest,
						name
					};
				}
				return guest;
			})
		});

	toggleFilter = () =>
		this.setState({
			isFiltered: !this.state.isFiltered
		});

	handleNameInput = (e) =>
		this.setState({
			pendingGuest: e.target.value
		});

	handleFormSubmit = (e) => {
		e.preventDefault();

		this.setState({
			guests: [{
				name: this.state.pendingGuest,
				isConfirmed: false,
				isEditing: false
			}, ...this.state.guests],
			pendingGuest: ""
		})
	}

	removeGuestAt = index =>
		this.setState({
			guests: [
				...this.state.guests.slice(0, index),
				...this.state.guests.slice(index +1)
			]
		})

	getNumberInvited = () => this.state.guests.length;
	getNumberAttending = () => 
		this.state.guests.reduce((total, guest) => 
			guest.isConfirmed ? total + 1 : total, 0);

	render() {
		const numberInvited = this.getNumberInvited();
		const numberAttending = this.getNumberAttending();
		const numberUncomfirmed = numberInvited - numberAttending;
		return (
			<div className="App">
				<header>
					<h1>RSVP</h1>
					<p>A Treehouse App</p>
					<form onSubmit={this.handleFormSubmit}>
						<input 
							type="text" 
							onChange={this.handleNameInput}
							value={this.state.pendingGuest} 
							placeholder="Invite Someone"
						/>
						<button type="submit" name="submit" value="submit">Submit</button>
					</form>
				</header>
				<div className="main">
					<div>
						<h2>Invitees</h2>
						<label>
							<input 
								type="checkbox"
								onChange={this.toggleFilter}
								checked={this.state.isFiltered}
							/> Hide those who haven't responded
						</label>
					</div>
					<Counter 
						numberInvited={numberInvited}
						numberAttending={numberAttending}
						numberUncomfirmed={numberUncomfirmed}
				/>
				
					<GuestList 
						guests={this.state.guests} 
						toggleConfirmationAt={this.toggleConfirmationAt}
						toggleEditingAt={this.toggleEditingAt}
						setNameAt={this.setNameAt}
						isFiltered={this.state.isFiltered}
						removeGuestAt={this.removeGuestAt}
						pendingGuest={this.state.pendingGuest}
					/>
				</div>
			</div>
		);
	}
}

export default App;
