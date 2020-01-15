import React, {Component} from 'react';

class CreateMealTemplate extends Component { //this is more create meal. have to change class names

    constructor(props){
        super(props);
        this.state = {
            title : "",
            description: "",
            city : "",
            dietary : "",
            date : new Date().toLocaleDateString(), //date and time will need to use a graphical calendar. At the moment are visualised for debug purposes
            time : new Date().toLocaleTimeString(),
            proposed_meal : "",
            expected_contribution : 0.0,
            guest_limit : 0,
            age_range : "", //have to discuss how to implement the range. 2 different fields? single slider that can set min and max?
            suggested_theme : "",
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    
    onChange(event){//every time an element is modified from the user this function is called. So it is possible to perform checks for each keystroke if needed
        this.setState({[event.target.name] : event.target.value});
    }

    onSubmit(event) {
        const {title, description, city} = this.state;
        console.log(this.state);
        event.preventDefault();
    }

    render() { //todo: add id to all the inputs
        return(
            <div>
                Create a Meal Event
            <div>
            <p />
                {this.state.title}
                {console.log(this.state.title + "asd")}
            </div>
            <form onSubmit={this.onSubmit}> 
                <div>
                    {/* id: <name_id>_cm; cm stands for create meal */}
                    <input name="title" id="title_cm" onChange={this.onChange} value={this.title} type="text" placeholder="Meal Title"/>
                </div>
                <p />
                <div>
                    <textarea name="description" id="description_cm" onChange={this.onChange} value={this.description} type="text" placeholder="Description meal" />
                </div>
                <div>
                    <input name="city" id="city_cm" onChange={this.onChange} value={this.city} type="text" placeholder="City" />
                </div>
                <div>
                    <input name="dietary" id="dietary_cm" onChange={this.onChange} value={this.dietary} /> {/*at the moment is a text box. Once DB connection is set up, should retreive multiple choices from DB and use a <select />*/}
                </div>
                <div>
                    <input name="date" id="date_cm" onChange={this.onChange} value={this.date} type="date" min={new Date().toLocaleDateString()} /> {/*date type is not supported on safari*/}
                </div>
                <div>
                    <input name="time" id="time_cm" onChange={this.onChange} value={this.time} type="time" />
                </div>
                <div>
                    <input name="proposed_meal" id="proposed_meal_cm" onChange={this.onChange} value={this.proposed_meal} type="text" />
                </div>
                <div>
                    <input name="expected_contribution" id="expected_contribution_cm" onChange={this.onChange} value={this.expected_contribution} type="number" placeholder="Expected contribution" />
                </div>
                <div>
                    <input name="guest_limit" id="gues_limit_cm" onChange={this.onChange} value={this.guest_limit} type="number" placeholder="Guest Limit" min="1"/>
                </div>
                <div>
                    <input name="age_range" id="age_range_cm" onChange={this.onChange} value={this.age_range} type="range" placeholder="age_range" min="0" max="99"/>
                </div>
                <div>
                    <input name="suggested_theme" id="suggested_theme_cm" onChange={this.onChange} value={this.age_range} type="text" placeholder="Suggested Theme" />
                </div>
                <button type="submit">
                    Create
                </button>
            </form>
            </div>
        );
    }
}

export default CreateMealTemplate;