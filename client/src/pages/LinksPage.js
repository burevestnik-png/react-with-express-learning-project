import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkList from "../components/LinkList";

const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, loader, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const fetchedLinks = await request('/api/link', 'GET', null, {
                authorization: `Bearer ${token}`
            })
            setLinks(fetchedLinks);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <LinkList links={links}/>}
        </>
    );
};

export default LinksPage;
