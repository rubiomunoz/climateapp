import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import 'tailwindcss/tailwind.css';


const AutoComplete = ({ onCitySelect }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = async ({ value }) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_ACCUWEATHER_KEY;

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&format=json&apiKey=${process.env.NEXT_PUBLIC_API_GEOAPIGY_KEY}`
      );

      if (!response.ok) {
        throw new Error('Error fetching suggestions');
      }

      const data = await response.json();
      setSuggestions(data.results.map(ciudad => ({
        name: ciudad.city,
        country: ciudad.country,
        lat: ciudad.lat, 
        lon: ciudad.lon ,
        line1: ciudad.address_line1,
        line2: ciudad.address_line2,
        Permissions: "granted",
      })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = suggestion => (
    <div className='bg-white text-gray-700 font-light p-2'>{suggestion.line1}, {suggestion.line2}</div>
  );

  const inputProps = {
    placeholder: 'Escribe y selecciona el nombre de la ciudad',
    value,
    onChange: (_, { newValue }) => setValue(newValue),
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    if (onCitySelect) {
      onCitySelect(suggestion);
      setValue('');
    }
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={suggestion => `${suggestion.name}, ${suggestion.country}`}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutoComplete;
