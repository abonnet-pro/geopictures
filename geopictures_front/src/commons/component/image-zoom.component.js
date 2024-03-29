import {useEffect, useState} from "react";
import {
    BackHandler,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import * as React from "react";
import {Image} from "@rneui/themed";
import LoadingView from "./loading.component";
import {URL_API} from "../../utils/url.utils";

export default function ImageZoom({ navigation, route }) {

    const [image, setImage] = useState(null);
    const [local, setLocal] = useState(false);
    const [loading, setLoading] = useState(true);

    const init = () => {
        const image = route.params.image;
        const local = route.params?.local;
        setImage(image);
        setLocal(local);
    }

    const getSource = () => {
        return local ? image : `${URL_API}/photos/${image}`;
    }

    useEffect(init, []);

    return(
        <View style={{ backgroundColor: 'black',}}>
            <View style={ style.backContainer }>
                <TouchableOpacity onPress={ () => navigation.goBack() }>
                    <Image style={ style.back } source={require('../../../assets/cross_white.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={ style.imageContainer }>
                <Image resizeMode={ "contain" }
                       style={ style.image }
                       PlaceholderContent={ <LoadingView/>}
                       source={{ uri:  getSource()}}
                       onLoadEnd={() => setLoading(false)}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        alignSelf: "flex-end"
    },
    back: {
        width: 25,
        height: 25
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        // margin: 10,
    }
});