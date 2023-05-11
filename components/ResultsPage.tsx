import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState, useEffect } from 'react';

interface IResults {
    items: Array<[]>;
}

const ResultsPage = () => {

    const form = useForm({
        initialValues: {
            author: '',
            works: '',
            year: 2018,
        },
    
        validate: {
            author: (value) => (value === null ? "Query can't be empty" : null),
        },
      });

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState<string>('');
    const [pubYear, setYear] = useState(0);

    useEffect(() => {
        fetchAuthor();
        fetchWork();
    }, [search, pubYear]);

    const fetchAuthor = async() => {

        const fetchItem = await fetch(`https://api.openalex.org/authors?search=${search}`, {mode:'cors'});
        const data = await fetchItem.json();
        setItems(data.results);
        
    }

    const fetchWork = async() => {

        const fetchWork = await fetch(`https://api.openalex.org/works?filter=display_name.search:${search},publication_year:${pubYear}`, {mode: 'cors'});
        const worksData = await fetchWork.json();
        setItems(worksData.results)
    }

    return (
        <div>

            <Box maw={300} mx="auto">
                <form onSubmit={form.onSubmit((value) => setSearch(value.author))}>
                    <TextInput
                    label="Search Authors"
                    placeholder="OpenAlex Search"
                    {...form.getInputProps('author')}
                    />

                    <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                    </Group>
                </form>
                <form onSubmit={form.onSubmit((value) =>  setSearch(value.works))}>
                    <TextInput
                    label="Search Works"
                    placeholder="OpenAlex Search"
                    {...form.getInputProps('works')}
                    />

                    <Group position="right" mt="md">
                    </Group>
                </form>
                <form onSubmit={form.onSubmit((value) => setYear(value.year))}>
                <TextInput
                    label="Filter by Publication Year"
                    placeholder="Enter a year"
                    {...form.getInputProps('year')}
                    />

                    <Group position="right" mt="md">
                    <Button type="submit">Filter</Button>
                    </Group>
                </form>
            </Box>
            {items.map((item) =>
            <div key ={item.id}>
                <li> Search Query: {item.display_name} </li>
                <div> Publication Year: {item.publication_year}</div>
            </div>
                
            )}
        </div>
    )
}

export default ResultsPage;