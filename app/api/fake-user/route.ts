import { NextResponse } from 'next/server';
import apiData from './data.json';

export async function GET() {
  return NextResponse.json(apiData);
}
