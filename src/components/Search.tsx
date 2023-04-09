import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { IProducts } from '../types/products';
import { useEffect, useState } from 'react';
import {     Button, Image, Input, List } from 'antd';
import { Link } from 'react-router-dom';
import productRequest from '../api/httpRequest/products';

function Search () {
    const [results, setResults] = useState<IProducts[]>([])
    const [show, setShow] = useState<boolean>(true)
    const [search, setSearch] = useState<string>()

    const render = (attrs: any) => {
        return (<div {...attrs}  style={{
            width: '500px',
            background: 'white',
            borderRadius: '10px',
            minHeight: '100px',
            border: '1px solid grey',
            padding: '10px',
            maxHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
          }} >
            <h3>Products</h3>
            <List
                style={{
                    flex: 1,
                    overflowY: 'auto',
                }}
                itemLayout="horizontal"
                dataSource={results}
                renderItem={(item, index) => (
                    <List.Item
                        key={index}
                        translate='yes'
                    >   
                        <Button type='text'  style={{ width: "100%", height: '80px', textAlign: 'left'}}>
                            <Link to={"/products/"+item._id}>
                                <List.Item.Meta
                                    avatar={<Image style={{ width: "70px", height: '70px'}} src={item.image} />}
                                    title={<Link to={"/products/" + item._id}>{item.name}</Link>}
                                    description={item.description}
                                />
                            </Link>
                        </Button>
                    </List.Item>
                )}
            />
        </div>
        )
    }

    useEffect(() => {
        if(search !== '') {
            const searchText = async() => {
                await productRequest.getAllProduct().then((data: any) => {
                    const res = data.filter((item: IProducts) => item.name.includes(search!))
                    setResults(res)
                })
            }
            searchText()
        } else {
            setResults([])
        }
    }, [search])

    return (
        <div>
            <Tippy
                interactive
                placement='bottom'
                onClickOutside={() => setShow(false)}
                visible={show && results.length > 0}
                theme='light'
                render={render}
            >
                <div>
                    <Input.Search 
                        allowClear 
                        size="large" 
                        placeholder='Search Item here...' 
                        style={{ width: '500px' }} 
                        onChange={(e) => setSearch(e.target.value)} 
                        onFocus={() => setShow(true)}
                    />
                </div>
            </Tippy>
        </div>
    )
}

export default Search