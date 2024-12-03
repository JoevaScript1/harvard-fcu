import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { CSSProperties, useEffect, useRef } from "react";

type Props = {
    style?: CSSProperties,
    className?: string,
    placeholder?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const AutocompleteInput = (props: Props) => {
    const places = useMapsLibrary('places');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!places || !inputRef.current) 
            return;

        console.log(places)

        const p = new places.Autocomplete(inputRef.current, {
            strictBounds: true,
            bounds: {
                south: 42.23286,
                east: -71.22737,
                north: 42.50599,
                west: -70.89242
            }
        });
        p.addListener('place_changed', e => {
            console.log(e);
            const place = p.getPlace();
            console.log(place);
        })
        // p.addListener()
    }, [places]);

    return (
        <input ref={inputRef} {...props} />
    )
}

const AddressBox = (props: Props) => {
    return (
        <APIProvider apiKey="AIzaSyDwmsT7zb6teXmmQj37OcwCKtP4S8R26Ks">
            <AutocompleteInput {...props} />
        </APIProvider>
    )
}

export default AddressBox;