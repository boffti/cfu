import React from 'react';
import ReactDOM from 'react-dom';
import Driver from './Driver';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Driver></Driver>, div)
})
