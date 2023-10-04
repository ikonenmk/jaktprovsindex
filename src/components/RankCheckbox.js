import React from 'react';
import { useState } from "react";

// Array inneh�llandes alla m�jliga v�rden anv�ndaren kan v�lja f�r att generera ranking
const userChoices = [
	{ name: "Sok", checked: false},
	{ name: "Skall", checked: false },
];

export const RankCheckbox = () => {
	const [checkedState, setCheckedState] = useState(
		new Array(userChoices.length).fill(false) //Skapar en array motsvarande antalet userChoices varje position s�tts till false
	);

	// Handler f�r klick i checkbox, tar emot index fr�n checkbox
	const checkHandler = (position) => {
		const updatedCheckedState = checkedState.map((item, index) => {
			if (index === position) { // Hitta r�tt position i arrayen (= index)
				return !item; //returnera motsatt v�rde (true/false => checked/unchecked)
			} else {
				return item; //returnera of�r�ndrat v�rde f�r �vriga positioner
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