import React from 'react';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import "../App.css"


export const RankCheckbox = ({ onCheckChange }) => {

	// Array innehållandes alla möjliga värden användaren kan välja för att generera ranking
	const [userChoices, setUserChoices] = useState([
		{ title: "Sök", name: "sok", value: false },
		{ title: "Skall", name: "skall", value: false },
		{ title: "Upptagsarbete", name: "upptagsarbete", value: false },
		{ title: "Väckning på slag", name: "vackning_pa_slag", value: false },
		{ title: "Drevarbete", name: "drevarbete", value: false },
		{ title: "Väckning på tappt", name: "vackning_pa_tappt", value: false },
		{ title: "Hörbarhet (skall)", name: "skall_horbarhet", value: false },
		{ title: "Skall under drev", name: "skall_under_drev", value: false },
		{ title: "Samarbete", name: "samarbete", value: false },
		{ title: "Lydnad", name: "lydnad", value: false },
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
		<>
			{userChoices.map((item, index) => (
				<React.Fragment key={index}>
					<div class="rankCheckBoxItem">
						<Form.Check id={`checkbox-${index}`} checked={item.value} onChange={() => checkHandler(item.name)} label={item.title}  data-bs-theme="dark" />
					</div>
				</React.Fragment>
				
			))}
			</>
	)
}