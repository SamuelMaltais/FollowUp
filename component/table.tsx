import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import {colors} from "@/component/colors";

const TableExample = () => {
    return (
        <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Amount</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
                <DataTable.Cell>Tylenol</DataTable.Cell>
                <DataTable.Cell>2 pills</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>{" "}</DataTable.Cell>
                <DataTable.Cell>{" "}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>{" "}</DataTable.Cell>
                <DataTable.Cell>{" "}</DataTable.Cell>
            </DataTable.Row>

        </DataTable>
    );
};

export default TableExample;

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
    },
    tableHeader: {
        backgroundColor: colors.lavender,
    },
});
