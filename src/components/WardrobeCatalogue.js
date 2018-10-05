import React, { Component } from 'react';
import { WardrobeItem } from './WardrobeItem';

class WardrobeCatalogue extends Component {

    constructor() {
        super();

        this.state = {
            count: undefined,
            sort: undefined,
            wardrobe: []
        }
    }

    componentDidMount() {
        fetch('./wardrobe.json')
            .then(res => res.json())
            .then(jsonData => {
                this.setState({
                    count: jsonData.length,
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
            this.setState({
                sort: term
            });
        }

        const totalWardrobeCost = (accumulator, currentWardrobeItem) => accumulator + currentWardrobeItem.cost;

        const resetAllFilters = () => {
            filterCategory();
            sortBy();
        }

        return (
            <div>
                <div className="c-header">
                    <button onClick={resetAllFilters}>
                        reset all
                    </button>
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
                    <button onClick={() => sortBy('cost')}>
                        cost
                    </button>
                    <button onClick={() => sortBy('timesWorn')}>
                        times worn
                    </button>

                    <p>${this.state.wardrobe.reduce(totalWardrobeCost, 0).toFixed(2)}</p>
                </div>
                <div className="c-list">
                    {this.state.wardrobe
                        .filter(item => (this.state.category === undefined || this.state.category === item.category))
                        .sort((a, b) => a[this.state.sort] > b[this.state.sort] ? -1 : 1)
                        .map(
                            (item, i) => {
                                return (
                                    <WardrobeItem
                                        category={item.category}
                                        colour={item.colour}
                                        comments={item.comments}
                                        condition={item.condition}
                                        cost={item.cost}
                                        description={item.description}
                                        isRemoved={item.removed}
                                        material={item.material}
                                        name={item.name}
                                        subcategory={item.subcategory}
                                        timesWorn={item.timesWorn}
                                        year={item.year}
                                    />
                                );
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

export { WardrobeCatalogue };