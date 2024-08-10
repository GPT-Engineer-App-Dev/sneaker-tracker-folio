import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

const initialTransactions = [
  { id: 1, date: '2024-03-01', amount: 150, type: 'expense', category: 'Nike' },
  { id: 2, date: '2024-03-05', amount: 200, type: 'income', category: 'Adidas' },
  { id: 3, date: '2024-03-10', amount: 180, type: 'expense', category: 'Jordan' },
];

const SneakerAccounting = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    amount: '',
    type: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editingId ? { ...newTransaction, id: t.id } : t))
      );
      setEditingId(null);
      toast({ title: "Transaction updated successfully!" });
    } else {
      setTransactions((prev) => [...prev, { ...newTransaction, id: Date.now() }]);
      toast({ title: "Transaction added successfully!" });
    }
    setNewTransaction({ date: '', amount: '', type: '', category: '' });
  };

  const handleEdit = (transaction) => {
    setNewTransaction(transaction);
    setEditingId(transaction.id);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Transaction deleted successfully!" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Super App for Sneakers!</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <Input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          required
        />
        <Select name="type" onValueChange={(value) => handleSelectChange('type', value)} value={newTransaction.type}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select name="category" onValueChange={(value) => handleSelectChange('category', value)} value={newTransaction.category}>
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nike">Nike</SelectItem>
            <SelectItem value="Adidas">Adidas</SelectItem>
            <SelectItem value="Jordan">Jordan</SelectItem>
            <SelectItem value="Yeezy">Yeezy</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">{editingId ? 'Update' : 'Add'} Transaction</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => handleEdit(transaction)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(transaction.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SneakerAccounting;