import React, { Component } from 'react';

class WardrobeCatalogue extends Component {

    constructor() {
        super();

        this.state = {
            data: {
                wardrobe: []
            },
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/wardrobe.json')
            .then(res => res.json())
            .then(jsonData => {
                this.setState({
                    data: jsonData,
                })
            })
    }

    render() {

        return (
            <div className="c-list">
                {this.state.data.wardrobe.map(
                    function(item, i) {
                        return (
                            <div className="c-list-item">
                                <h3 className="item-name">{item.name}</h3>
                                <div className="item-category">{item.category}
                                    {item.subcategory != null && <span className="item-subcategories">{item.subcategory.join(' • ')}</span>}
                                </div>
                                <span className="item-year">{item.year}</span>
                                <div>Colour
                                    <ul className="item-colour">
                                        {item.colour.map(c => {
                                            if(typeof c === 'string') return <li>{c}</li>;
                                            return <li>{c.pattern}</li>
                                        })}
                                    </ul>
                                </div>
                                <p>Condition: {item.condition}</p>
                                <hr />
                                <p>{item.comments}</p>
                            </div>
                        );
                    })}
            </div>
        );

    }

}

export { WardrobeCatalogue };