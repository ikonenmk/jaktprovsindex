import React from 'react';
import { useState } from "react";



export const RankCheckbox = ({ onCheckChange }) => {

	// Array innehållandes alla möjliga värden användaren kan välja för att generera ranking
	const [userChoices, setUserChoices] = useState([
		{ name: "sok", value: false },
		{ name: "skall", value: false },
		{ name: "upptagsarbete", value: false },
		{ name: "vackning_pa_slag", value: false },
		{ name: "drevarbete", value: false },
		{ name: "vackning_pa_tappt", value: false },
		{ name: "skall_horbarhet", value: false },
		{ name: "skall_under_drev", value: false },
		{ name: "samarbete", value: false },
		{ name: "lydnad", value: false },
	]);

	// Handler för klick i checkbox
	const checkHandler = (boxName) => {
			const updatedCheckedState = userChoices.map((item) => {
				if (item.name === boxName) {						//Hitta rätt element i arrayen
					if (item.value == false) {						//Kontrollera värde och invertera
						item.value = true;
					} else {
						item.value = false;
					}
					return item; //returnera uppdaterat element 
				
			} else {
				return item; //returnera oförändrat element
			}
		}
		);
		setUserChoices(updatedCheckedState);			//Uppdatera child (detta) state med den nya arrayen
		onCheckChange(updatedCheckedState);				//Uppdatera parent (Search) state
	}
	return (
			<div>
			{userChoices.map((item, index) => (
				<React.Fragment key={index}>
					<div class="rankCheckBoxItem">
						<input type="checkbox" id={`checkbox-${index}`} checked={item.value} onChange={() => checkHandler(item.name)} /><label htmlFor={`checkbox-${index}`}> {item.name} </label>
					</div>
				</React.Fragment>
				
			))}
			</div>
	)
}