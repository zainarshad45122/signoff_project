import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/header';
import { useTheme, Card, Divider, Paragraph, Text, Button, ActivityIndicator, TextInput } from 'react-native-paper';
import { getBaseUrl, getSupervisorJobs } from '../../ApiManager/request';
import { getValue } from '../../helper/storageWrapper';
import { GET } from '../../ApiManager/apiManager';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Camera from '../../components/camera';
import Modal from '../../components/modal';
import Signature from 'react-native-signature-canvas';

var RNFS = require('react-native-fs');
import styles from './style';
import { colors } from 'react-native-elements';

export default function index(props) {
    const { setSignature, handleSignature, savedSignature, setSavedSignature } = props;
    const { colors } = useTheme();
    const ref = useRef();
    const [scrollEnabled, setScrollEnabled] = useState(true);

    useEffect(() => {

        (async () => {

        })();
    }, []);

    _onSaveEvent = (result) => {
        console.log('Signature Path From On Saved Event', result.encoded);
        console.log('Signature Path ', result.pathName);

    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        //ref.current.clearSignature();
        setSavedSignature('');
        setSignature('');
        console.log('clear success!');
    };


    // Called after ref.current.getData()

    const handleConfirm = () => {
        ref.current.readSignature();
    };

    const webStyle = `.m-signature-pad--footer
      .save {
          display: none;
      }
      .button {
        background-color: red;
        color: #FFF;
      }
  `;

    return (
        <View style={{ height: 400, width: '98%', padding: 10 }}>
            <Signature
                webStyle={`.m-signature-pad--footer
                          .button {
                            background-color: #194467;
                            color: #FFF;
                          }
                          .save {
                            display: none;
                        }
                        .clear {
                            margin: auto
                        }`}
                ref={ref}
                dataURL={savedSignature == '' ? '' : savedSignature}
                onOK={(img) => handleSignature(img)}
                onBegin={() => setScrollEnabled(false)}
                onEnd={handleConfirm}
                onClear={handleClear}
                descriptionText=""
                clearText="RESIGN"
                confirmText="Save"
                imageType="image/jpeg"
                backgroundColor="rgb(255,255,255)"
            />
        </View>
    );
}
