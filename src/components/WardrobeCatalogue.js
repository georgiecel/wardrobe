import React, { Component } from 'react';

class WardrobeCatalogue extends Component {

    constructor() {
        super();

        this.state = {
            wardrobe: []
        }
    }

    componentDidMount() {
        fetch('./wardrobe.json')
            .then(res => res.json())
            .then(jsonData => {
                this.setState({
                    wardrobe: jsonData,
                    filteredData: jsonData,
                })
            })
    }

    render() {

        const filterCategory = (category) => {
            this.setState({
                category
            });
        }

        const sortBy = (term) => {
            // console.log('sort me');

            // console.log(this.state.wardrobe);

            this.state.wardrobe
                .sort((a, b) => a.term > b.term)
                    .map((item, i) =>
                        console.log(item.cost)
                    );

                //     item.cost.sort((a, b) =>
                //         (a.cost > b.cost) &&
                //             console.log ('hi')
                //     )
                // })

                // .sort((a, b) => a.)
                // .sort(item => {
                //     console.log(item.cost);
                // });

            // this.state.wardrobe
            //     .sort((a, b) => {
            //         if (a.term > b.term) {
            //             console.log(term);
            //         }
            //         else {
            //             console.log('no');
            //         }
            //     });

            // this.state.wardrobe
            //     .sort((a, b) => a.term > b.term)
            //         .map((item, i) => 
            //             <div key={i}> {item.term}</div>
            //         );
            //         console.log(term);
        }

        const category = (value) => {
            switch(value) {
                case 'dress' :
                case 'skirt' :
                    return <span role="img" aria-label="teal flared dress">👗</span>;
                case 'outerwear' :
                    return <span role="img" aria-label="brown overcoat">🧥</span>;
                case 'top' :
                    return <span role="img" aria-label="pink blouse">👚</span>;
                case 'pants' :
                case 'jeans' :
                    return <span role="img" aria-label="blue pair of jeans">👖</span>;
                default :
            }
        }

        const itemCost = (value) => {
            if (value !== '')
            return '$' + parseFloat(value).toFixed(2);
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
            <div>
                <div className="c-header">
                    <button onClick={()=>filterCategory('top')}>
                        tops
                    </button>
                    <button onClick={()=>filterCategory('pants')}>
                        pants
                    </button>
                    <button onClick={()=>filterCategory('dress')}>
                        dresses
                    </button>
                    <button onClick={()=>filterCategory('skirt')}>
                        skirts
                    </button>
                    <button onClick={()=>filterCategory('jeans')}>
                        jeans
                    </button>
                    <button onClick={()=>filterCategory('outerwear')}>
                        outerwear
                    </button>
                    <p>Order by</p>
                    <button onClick={()=>sortBy('cost')}>
                        cost
                    </button>
                </div>
                <div className="c-list">
                    {this.state.wardrobe.filter(item => (this.state.category === undefined || this.state.category === item.category)).map(
                        function(item, i) {
                            return (
                                <div
                                    className="c-list-item"
                                    key={i}
                                >
                                    <h3 className="item-name">{ category(item.category) }{item.name}</h3>
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
            </div>
        );
    }
}

export { WardrobeCatalogue };