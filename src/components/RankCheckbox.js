import React from 'react';
import { useState } from "react";

// Array innehållandes alla möjliga värden användaren kan välja för att generera ranking
const userChoices = [
	{ name: "Sok", checked: false},
	{ name: "Skall", checked: false },
];

export const RankCheckbox = () => {
	const [checkedState, setCheckedState] = useState(
		new Array(userChoices.length).fill(false) //Skapar en array motsvarande antalet userChoices varje position sätts till false
	);

	// Handler för klick i checkbox, tar emot index från checkbox
	const checkHandler = (position) => {
		const updatedCheckedState = checkedState.map((item, index) => {
			if (index === position) { // Hitta rätt position i arrayen (= index)
				return !item; //returnera motsatt värde (true/false => checked/unchecked)
			} else {
				return item; //returnera oförändrat värde för övriga positioner
			}

		}
		);
		setCheckedState(updatedCheckedState);
	}
	return (
			<div>
			{userChoices.map(({name}, index) => (
				<React.Fragment key={index}>
					<input type="checkbox" id={`checkbox-${index}`} checked={checkedState[index]} onChange={() => checkHandler(index)} /><label htmlFor={`checkbox-${index}`}> {name}</label>
				</React.Fragment>
				
			))}
			</div>
	)
}