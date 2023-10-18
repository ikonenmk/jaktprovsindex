import React from 'react';
import { useState } from "react";



export const RankCheckbox = ({ onCheckChange }) => {

	// Array inneh�llandes alla m�jliga v�rden anv�ndaren kan v�lja f�r att generera ranking
	const [userChoices, setUserChoices] = useState([
		{ name: "sok", value: false },
		{ name: "skall", value: false },
	]);

	
	// Handler f�r klick i checkbox
	const checkHandler = (boxName) => {
			const updatedCheckedState = userChoices.map((item) => {
				if (item.name === boxName) {						//Hitta r�tt element i arrayen
					if (item.value == false) {						//Kontrollera v�rde och invertera
						item.value = true;
					} else {
						item.value = false;
					}
					return item; //returnera uppdaterat element 
				
			} else {
				return item; //returnera of�r�ndrat element
			}
		}
		);
		console.log(updatedCheckedState);
		setUserChoices(updatedCheckedState);			//Uppdatera child (detta) state med den nya arrayen
		onCheckChange(updatedCheckedState);				//Uppdatera parent (Search) state
	}
	return (
			<div>
			{userChoices.map((item, index) => (
				<React.Fragment key={index}>
					<input type="checkbox" id={`checkbox-${index}`} checked={item.value} onChange={() => checkHandler(item.name)} /><label htmlFor={`checkbox-${index}`}> {item.name}</label>
				</React.Fragment>
				
			))}
			</div>
	)
}