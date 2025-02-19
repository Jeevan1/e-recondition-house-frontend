'use client';
import { formatCurrency } from '@/helper';
import React from 'react';

const PriceContainer = ({ price }: { price: number }) => {
  return <span>{formatCurrency(price)}</span>;
};

export default PriceContainer;
