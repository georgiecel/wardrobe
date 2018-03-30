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
        fetch('./wardrobe.json')
            .then(res => res.json())
            .then(jsonData => {
                this.setState({
                    data: jsonData,
                })
            })
    }

    render() {

        const clothingType = (value) => {
            if (value === 'dress' || value === 'skirt') {
                return <span role="img" aria-label="teal flared dress">👗</span>;
            }
            if (value === 'outerwear') {
                return  <span role="img" aria-label="brown overcoat">🧥</span>;
            }
            if (value === 'top') {
                return  <span role="img" aria-label="pink blouse">👚</span>;
            }
            if (value === 'pants' || value === 'jeans') {
                return  <span role="img" aria-label="blue pair of jeans">👖</span>;
            }
            return;
        }

        const itemCost = (value) => {
            if (value !== '')
            return '$' + parseFloat(Math.round(value * 100) / 100).toFixed(2);
            return 'unknown';
        }

        const costPerWear = (value, timesWorn) => {
            if ((value !== '') && (timesWorn !== ''))
            return '$' + (value / timesWorn).toFixed(2);
            return 'unknown';
        }

        const inlineList = (value) => {
            return value.join(' • ');
        }

        return (
            <div className="c-list">
                {this.state.data.wardrobe.map(
                    function(item, i) {
                        return (
                            <div className="c-list-item">
                                <h3 className="item-name">{ clothingType(item.category) }{item.name}</h3>
                                <p className="item-category">
                                    <strong>{item.category}</strong>
                                    {item.subcategory != null && <span className="inline-list">{ inlineList(item.subcategory) }</span>}
                                </p>
                                <span className="item-year">{item.year}</span>
                                <p>
                                    <strong>Colour</strong>
                                    <span className="inline-list">{ inlineList(item.colour) }</span>
                                </p>
                                <p>
                                    <strong>Material</strong>
                                    <span className="inline-list">{ inlineList(item.material) }</span>
                                </p>
                                <hr />
                                <p>{item.description}</p>
                                <p>{item.comments}</p>
                                <p><span role="img" aria-label="sack of money">💰</span> <strong>Purchased for:</strong> { itemCost(item.cost) }<br />
                                <span role="img" aria-label="handful of paper money">💵</span> <strong>Average cost per wear:</strong> { costPerWear(item.cost, item.timesWorn) }<br />
                                <span role="img" aria-label="sparkles">✨</span> <strong>Condition:</strong> {item.condition}</p>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

export { WardrobeCatalogue };