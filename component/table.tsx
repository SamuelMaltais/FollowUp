import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { colors } from "@/component/colors";

interface TableProps {
    namePills: string[];
    amount: string[];
    isPast: boolean[];
}

const TableExample: React.FC<TableProps> = ({ namePills, amount, isPast }) => {
    return (
        <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Amount</DataTable.Title>
                <DataTable.Title>Taken?</DataTable.Title>
            </DataTable.Header>

            {namePills.map((name, index) => (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{name}</DataTable.Cell>
                    <DataTable.Cell>{amount[index]}</DataTable.Cell>
                    <DataTable.Cell>{isPast[index] ? " ✅️" : "❌"}</DataTable.Cell>
                </DataTable.Row>
            ))}
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
